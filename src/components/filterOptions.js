import './filterOptions.css'
function FilterOptions({setFilter}) {

    return(
        <div>
            <button class="button-5" onClick={() => setFilter("sector")}>Sector</button>
            <button class="button-5" onClick={() => setFilter("country")}>Country</button>
            <button class="button-5" onClick={() => setFilter("region")}>Region</button>
            <button class="button-5" onClick={() => setFilter("topic")}>Topic</button>
            <button class="button-5" onClick={() => setFilter("end_year")}>End Year</button>
            <button class="button-5" onClick={() => setFilter("pestle")}>Pestel</button>
            <button class="button-5" onClick={() => setFilter("source")}>Source</button>


        </div>
    )
}

export default FilterOptions;
