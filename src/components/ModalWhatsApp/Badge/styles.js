import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  span {
    position: absolute;
    top: -6px;
    right: -6px;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    border: 2px solid #394554;
    color: #394554;
    background: #fff;
    vertical-align: middle;
    text-align: center;
    font-weight: bold;
    font-size: 10px;
  }
`;
