import { Autocomplete, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

export default function MUIAutocomplete({
  inputLabel,
  selectedOption,
  setSelectedOption,
  optionsList,
  multiple,
  required,
  name,
  size,
}) {
  const [inputValue, setInputValue] = useState("");
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    let date_list = [];
    optionsList.map((item) => {
      if (multiple) {
        let find = selectedOption?.find((selected) =>
          name ? selected[name] == item[name] : selected == item
        );
        if (!find) {
          return date_list.push(item);
        }
      } else if (
        !selectedOption ||
        (name ? selectedOption[name] !== item[name] : selectedOption !== item)
      ) {
        return date_list.push(item);
      }
    });

    setDataList(date_list);
  }, [optionsList, selectedOption]);

  return (
    <Autocomplete
      multiple={multiple}
      value={selectedOption}
      onChange={(event, newValue) => {
        setSelectedOption(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      className="w-100 mui-select autocomplete-mui"
      PaperComponent={({ children }) => (
        <Paper className="autocomplete-paper">{children}</Paper>
      )}
      size={size ? size : "medium"}
      id="controllable-states-demo"
      options={dataList}
      getOptionLabel={(option) => (name ? option[name] : option)}
      renderInput={(params) => {
        const inputProps = params.inputProps;
        inputProps.autoComplete = "off";
        return (
          <TextField
            {...params}
            label={inputLabel}
            className="form-control"
            placeholder={inputLabel}
            required={required}
          />
        );
      }}
    />
  );
}
