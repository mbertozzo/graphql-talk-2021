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

  const onDragEnd = (result) => {};

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error</p>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {data.columns.map((column, index) => {
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={column.tasks}
                  index={index}
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
