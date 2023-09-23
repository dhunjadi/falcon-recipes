import Button from './Button';

interface PaginationProps {
    showPerPage: number;
    total: number;
    onPageSelect: (pageNumber: number) => void;
    activePage: number;
}

const Pagination = ({showPerPage, total, onPageSelect, activePage}: PaginationProps) => {
    const pageNumbers = Array.from({length: Math.ceil(total / showPerPage)}, (_, i) => i + 1);

    return (
        <nav className="c-pagination">
            <ul className="c-pagination__list">
                {pageNumbers.map((number) => (
                    <li key={number} className={`c-pagination__list_item ${number === activePage && 'active'}`}>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                onPageSelect(number);
                            }}
                        >
                            {number}
                        </Button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
