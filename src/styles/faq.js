import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
`;
export const Entity = styled.div`
  color: Black;
  border: 1px solid white;
  max-width: 100%;
  width: 100%;
  margin-bottom: 10px;
  margin: auto;
  &:first-of-type {
    margin-top: 1.5em;
  }
`;
export const Inner = styled.div`
  padding: 75px 40px;
  width: 100%;
  max-width: 100%;
  margin: auto;
  flex-direction: column;
  display: flex;
`;
export const Question = styled.div`
  font: 25px;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 2px;
  display: flex;
  font-weight: normal;
  background: #E5E4E2;
  padding: 0.75em 1.12em;
  align-items: center;
`;
export const Text = styled.p`
  color: black;
  max-height: 1190px;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
  background: #F3F3F3;
  transition: max-height 0.23s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.9em 2.1em 0.7em 1.4em;
  user-select: none;
  white-space: pre-wrap;
  @media (max-width: 550px) {
    font-size: 15px;
    line-height: 25px;
  }
`;
export const Header = styled.h1`
  color: black;
  font-size: 30px;
  @media (max-width: 600px) {
    font-size: 33px;
  }
`;