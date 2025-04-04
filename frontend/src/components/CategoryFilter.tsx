import { useEffect, useState } from "react";
import "./CategoryFilter.css";

// This component fetches book categories from the API and allows users to filter books by category using checkboxes.
function CategoryFilter ({selectedCategories, setSelectedCategories}: {selectedCategories: string[]; setSelectedCategories: (categories: string[]) => void;})
{
    const [categories, setCategories] = useState<string[]>([]);
    
    // useEffect to fetch categories when the component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try{
                const response = await fetch("https://book-malone-backend-cqbrfphzepdqexe2.eastus-01.azurewebsites.net/Book/GetBookCategories");
                const data = await response.json();
                console.log("Fetched categories: ",data);
                setCategories(data);
            }
            catch (error){
                console.error('Error fetching categories: ', error);
            }
            
        }

        fetchCategories();

    }, []);

    // Function to handle checkbox changes and update selected categories
    function handleCheckboxChange({target}: {target: HTMLInputElement}){
        const updatedCategories = selectedCategories.includes(target.value) ? selectedCategories.filter((x) => x !== target.value) : [...selectedCategories, target.value];
    
        setSelectedCategories(updatedCategories);
    }

    return (
        <>
            <div className="category-filter">
                <h5>Book Category</h5>
                <div className="category-list">
                    {categories.map((b) => (
                        <div key={b} className="category-item">
                            <input 
                                type="checkbox" 
                                id={b} value={b} 
                                className="category-checkbox" 
                                onChange={handleCheckboxChange}/>
                            <label htmlFor={b}>{b}</label>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
export default CategoryFilter;