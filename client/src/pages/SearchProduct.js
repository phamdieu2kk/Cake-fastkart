import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryApi from '../common';
import VerticalCard from '../components/VerticalCard';

const SearchProduct = () => {
    const query = useLocation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({ category: '', priceRange: [0, 100000] });

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.searchProduct.url + query.search);
            const dataResponse = await response.json();
            setData(dataResponse.data || []);
        } catch (err) {
            console.error(err);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [query]);

    // Hàm filter tại client (hoặc gọi API filter ở backend)
    const filteredData = data.filter((item) => {
        const withinPrice = item.sellingPrice >= filter.priceRange[0] && item.sellingPrice <= filter.priceRange[1];
        const matchesCategory = filter.category ? item.category === filter.category : true;
        return withinPrice && matchesCategory;
    });

    return (
        <div className="container p-4 pt-[100px] mx-auto">
            {/* Filter */}
            <div className="sticky top-[100px] z-20 bg-white p-4 mb-4 rounded shadow">
                <p className="mb-2 font-medium">Bộ lọc sản phẩm</p>
                <div className="flex flex-wrap gap-4">
                    <select
                        className="px-2 py-1 border rounded"
                        value={filter.category}
                        onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                    >
                        <option value="">Tất cả danh mục</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Books">Books</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Giá từ"
                        className="border rounded px-2 py-1 w-[100px]"
                        value={filter.priceRange[0]}
                        onChange={(e) =>
                            setFilter({ ...filter, priceRange: [Number(e.target.value), filter.priceRange[1]] })
                        }
                    />
                    <input
                        type="number"
                        placeholder="Giá đến"
                        className="border rounded px-2 py-1 w-[100px]"
                        value={filter.priceRange[1]}
                        onChange={(e) =>
                            setFilter({ ...filter, priceRange: [filter.priceRange[0], Number(e.target.value)] })
                        }
                    />
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-12 h-12 mb-4 border-4 border-gray-300 rounded-full border-t-yellow-400 animate-spin"></div>
                    <p className="text-lg font-medium text-gray-600">Đang tải sản phẩm...</p>
                </div>
            )}

            {/* Kết quả */}
            {!loading && (
                <>
                    <p className="my-3 text-lg font-semibold">Kết quả tìm kiếm: {filteredData.length}</p>
                    {filteredData.length === 0 ? (
                        <p className="p-4 text-lg text-center bg-white rounded shadow">Không tìm thấy dữ liệu...</p>
                    ) : (
                        <VerticalCard loading={loading} data={filteredData} />
                    )}
                </>
            )}
        </div>
    );
};

export default SearchProduct;
