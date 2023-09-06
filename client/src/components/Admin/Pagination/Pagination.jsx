import { Pagination, Stack } from "@mui/material";
import { useFormAction } from "react-router-dom";


const Paginations = ({page, total, limit, setPage }) => {

    const totalPages = Math.ceil(total / limit);

    const handleChange = (event, value) => {
        setPage(value)
      };
    
    return (
        <Stack spacing={2}>

            <Pagination count={totalPages} page={page}  onChange={handleChange} /> 
            

        </Stack>
    )
}


export default Paginations