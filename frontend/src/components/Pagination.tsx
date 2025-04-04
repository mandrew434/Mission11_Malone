interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newPageSize: number) => void;
}

// This component is used to display pagination controls for navigating through a list of items. It takes in the current page, total pages, page size, and functions to handle page changes and page size changes as props.
// It renders buttons for navigating to the previous and next pages, as well as a dropdown for selecting the number of results per page.
const Pagination = ({currentPage, totalPages, pageSize, onPageChange, onPageSizeChange}: PaginationProps) => {

    return(
        <div className="flex item-center justify-center mt-4">
            {/* Display Page Numbers */}
            <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} >Previous</button>
                {

            [...Array(totalPages)].map((_, i) => (
                <button key={i + 1} onClick={() => onPageChange(i + 1)} disabled={currentPage === (i+1)}>{i + 1}
                </button>
            ))
            }

            <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>Next</button>

            <br />
            <br />
            <label>Results per page</label>
            <select id="resultsPerPage" value={pageSize} onChange={
            (b) => {onPageSizeChange(Number(b.target.value));
            onPageChange(1);
            }
            }>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>  
            </select>
        </div>
    );
}

export default Pagination;