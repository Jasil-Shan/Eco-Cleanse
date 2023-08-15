import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


const SelectBox = ({setSort,sort})=> {

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Sort</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={sort}
        label="Sort"
        onChange={handleChange}
      >
        <MenuItem > None
        </MenuItem>
        <MenuItem value={'name'}>Name</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectBox