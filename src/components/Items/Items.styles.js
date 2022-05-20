import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  border-bottom: 1px solid lightblue;
  padding-bottom: 5px;

  div {
    flex: 1;
    padding-left: 5px;
    padding-right:5px;
  }

  .information,
  .buttons {
    display: flex;
    justify-content: space-between;    
  }

  img {
    max-width: 150px;
    object-fit: cover;
    margin-left: 10px;
    padding-right:25px;
  }
`;
