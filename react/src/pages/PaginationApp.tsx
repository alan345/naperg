import React from "react";
import queryString from "query-string"
import { Pagination } from "@material-ui/lab";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  count: number;
  take: number;
}

const PaginationApp: React.FC<Props> = (props: Props) => {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const page: number = parsed.page ? Number(parsed.page) : 1;

  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<unknown>, page: number) => {
    parsed.page = String(page);
    navigate("?" + queryString.stringify(parsed));
  };

  return (
    <>
      <Pagination
        count={Math.ceil(props.count / props.take)}
        onChange={onChange}
        page={page}
      />
    </>
  );
};

export default PaginationApp;
