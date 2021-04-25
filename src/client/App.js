import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from './Column';

const Container = styled.div`
  display: flex;
`;

const GET_DATA = gql`
  query {
    columns {
      id
      title
      position
      tasks {
        id
        title
      }
    }
  }
`;

const App = (props) => {
  const { loading, error, data } = useQuery(GET_DATA);
  const [homeIndex, setHomeIndex] = useState(null);

  const onDragStart = (start) => {
    const homeColumn = data.columns.find(
      (c) => c.id === start.source.droppableId,
    );

    setHomeIndex(Number.parseInt(homeColumn.id, 10));
  };

  const onDragEnd = (result) => {
    setHomeIndex(null);
    console.log('RESULT', result);
  };

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error</p>;

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {data.columns.map((column, idx) => {
              const index = idx + 1;

              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={column.tasks}
                  index={index}
                  isDropDisabled={index === homeIndex}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
