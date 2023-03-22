import styled from "styled-components";
import React from "react";
import theme from "../../utils/theme";
import Header from "../header";

interface MainLayoutProps {
    children: React.ReactElement;
}

const MainContentWrapper = styled.main`
  padding: 3rem 5rem;
  color: ${theme.palette.text.light};
  background-color: ${theme.palette.highlight};
  width: 100%;
  position: relative;
`;

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    return (
        <>
            <Header/>
            <MainContentWrapper>
                {children}
            </MainContentWrapper>
        </>
    );
};

export default MainLayout;
