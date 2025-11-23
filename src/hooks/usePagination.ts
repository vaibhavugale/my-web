import { useState, useMemo } from "react";

interface UsePaginationProps<T> {
    data: T[];
    itemsPerPage: number;
}

interface UsePaginationReturn<T> {
    currentPage: number;
    totalPages: number;
    currentData: T[];
    nextPage: () => void;
    prevPage: () => void;
    goToPage: (page: number) => void;
}

export const usePagination = <T>({
    data,
    itemsPerPage,
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = useMemo(
        () => Math.ceil(data.length / itemsPerPage),
        [data.length, itemsPerPage]
    );

    const currentData = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return data.slice(indexOfFirstItem, indexOfLastItem);
    }, [currentPage, data, itemsPerPage]);

    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const goToPage = (page: number) => {
        const pageNumber = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(pageNumber);
    };

    return { currentPage, totalPages, currentData, nextPage, prevPage, goToPage };
};