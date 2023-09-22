import Button from './Button';

interface PaginationProps {
    showPerPage: number;
    total: number;
    onPageSelect: (pageNumber: number) => void;
}

const Pagination = ({showPerPage, total, onPageSelect}: PaginationProps) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(total / showPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="c-pagination">
            <ul className="c-pagination__list">
                {pageNumbers.map((number) => (
                    <li key={number} className="c-pagination__list_item">
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
