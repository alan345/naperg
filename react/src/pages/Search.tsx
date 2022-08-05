import React, { useState } from "react";
import { FormControl, InputLabel, Input, Grid } from "@material-ui/core";
import queryString from "query-string"
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useNavigate, useLocation } from "react-router-dom";
import ClearIcon from "@material-ui/icons/Clear";

const Search: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const parsed = queryString.parse(location.search);

  const [search, setSearch] = useState(parsed.search ? parsed.search : "");

  const onKeyPress = (data: React.KeyboardEvent<HTMLInputElement>) => {
    if (data.charCode === 13) {
      searchF();
    }
  };

  const searchF = () => {
    parsed.search = search;
    parsed.page = "1";
    navigate("?" + queryString.stringify(parsed));
  };

  return (
    <>
      <Grid item xs={12} md={3} className="">
        <FormControl className="inputWidth">
          <InputLabel htmlFor="search">{`Search`}</InputLabel>
          <Input
            endAdornment={
              <InputAdornment position="end">
                {parsed.search ? (
                  <ClearIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSearch("");
                      delete parsed.search;

                      navigate("?" + queryString.stringify(parsed));
                    }}
                  />
                ) : (
                  <SearchIcon style={{ cursor: "pointer" }} onClick={searchF} />
                )}
              </InputAdornment>
            }
            id="search"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            type="text"
            onKeyPress={onKeyPress}
            value={search}
          />
        </FormControl>
      </Grid>
    </>
  );
};

export default Search;
