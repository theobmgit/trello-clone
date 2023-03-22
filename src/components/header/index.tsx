import styled from "styled-components";
import theme from "../../utils/theme";
import Button from "../common/button";
import {useCallback} from "react";
import IndexDB from "../../db";

const Header = () => {
    const onClickWipe = useCallback(() => {
        // eslint-disable-next-line no-restricted-globals
        const cf = confirm("This will erase all your tasks and boards data and is unrecoverable.\nAre you sure?")
        if (cf) {
            IndexDB.clear().then(() => {
                window.location.reload();
            });
        }
    }, []);

    return (
        <HeaderWrapper>
            <h1>Trello Clone</h1>
            <Button style={{height: 'fit-content'}} variant={"error"} onClick={onClickWipe}>Wipe All</Button>
        </HeaderWrapper>
    );
};

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${theme.palette.primary};
  padding: 0 5rem;
  width: 100%;
`;

export default Header;
