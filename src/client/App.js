import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from './Column';

const Container = styled.div`
  display: flex;
`;

const GET_COLUMNS = gql`
  query {
    columns {
      id
      title
      position
    }
  }
`;

const App = (props) => {
  const {
    loading: columnLoading,
    error: columnError,
    data: columnData,
  } = useQuery(GET_COLUMNS);

  const onDragEnd = (result) => {};

  if (columnLoading) return <p>Loading ...</p>;
  if (columnError) return <p>Error</p>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {columnData.columns.map((column, index) => {
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={[]}
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
