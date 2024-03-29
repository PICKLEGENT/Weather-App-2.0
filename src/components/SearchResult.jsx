import { SvgIcon, Typography } from '@mui/material';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { PropTypes } from 'prop-types';

const SearchResult = ({ result, handleSearch }) => {
	const selectCity = (result) => {
		handleSearch(result);
	};

	return (
		<>
			<div
				className='flex justify-start items-center p-2.5 hover:bg-[#b6a0e6] hover:text-[#1D1B1F] duration-300 ease-in-out cursor-pointer'
				onClick={() => selectCity(result)}
			>
				<SvgIcon
					component={PlaceOutlinedIcon}
					sx={{ marginRight: '5px', fontSize: '22px' }}
					inheritViewBox
				/>
				<Typography
					sx={{
						letterSpacing: '0.05em',
					}}
				>
					{result.label}
				</Typography>
			</div>
		</>
	);
};

SearchResult.propTypes = {
	result: PropTypes.any,
	handleSearch: PropTypes.any,
};

export default SearchResult;
