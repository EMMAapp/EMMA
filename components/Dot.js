import styled from "styled-components";
import {View} from "react-native";

export const Dot = styled(View)`
background-color: ${props => props.color};
width: 4px;
height: 4px;
margin-top: 4px;
margin-left: 1px;
margin-right: 1px;
border-radius: 2px;
`;
