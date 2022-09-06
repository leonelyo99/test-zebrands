import styled from "styled-components";
import Pagination from "react-bootstrap/Pagination";
import { useState } from "react";

const ACCOUNT = {
  addition: "ADDITION",
  subtraction: "SUBTRACTION",
};

const PaginationLibrary = ({ callbackFunction }) => {
  const [activePage, setActivePage] = useState(1);

  const handlePageClick = (account) => {
    const page =
      account === ACCOUNT.addition
        ? activePage + 1
        : activePage === 1
        ? activePage
        : activePage - 1;
    if (page === 1 && activePage === 1) return;
    setActivePage(page);
    callbackFunction(page - 1);
  };

  return (
    <Container>
      <Pagination>
        <Pagination.Prev
          disabled={activePage === 1}
          onClick={() => {
            handlePageClick(ACCOUNT.subtraction);
          }}
        />
        <Pagination.Item key={activePage} active>
          {activePage}
        </Pagination.Item>
        <Pagination.Next
          onClick={() => {
            handlePageClick(ACCOUNT.addition);
          }}
        />
      </Pagination>
    </Container>
  );
};
export default PaginationLibrary;

const Container = styled.div`
  width: fit-content;
  position: fixed;
  bottom: 8px;
  right: 24px;
`;
