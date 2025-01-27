const getColumnDefs = (preferredSearchEngine, updateLastVisited) => [
  {
    field: "expand",
    headerName: "",
    width: 50,
    sortable: false,
    filter: false,
    cellRenderer: (params) => (
      <i className="fas fa-chevron-right" style={{ cursor: "pointer" }}></i>
    ),
  },
  {
    field: "name",
    sortable: true,
    filter: true,
    comparator: (a, b) => {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    },
    tooltipField: "name",
  },
  { field: "industry", sortable: true, filter: true, tooltipField: "industry" },
  { field: "summary", sortable: true, filter: true, tooltipField: "summary" },
  {
    field: "careersSiteWorldWide",
    headerName: "Careers Site Worldwide",
    width: 215,
    cellRenderer: (params) =>
      params.value ? (
        <a
          href={params.value}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => updateLastVisited(params.data, "careersSiteWorldWide")}
        >
          URL
        </a>
      ) : (
        "Not Available"
      ),
  },
  {
    field: "careersSiteUS",
    headerName: "Careers Site (US)",
    cellRenderer: (params) =>
      params.value ? (
        <a
          href={params.value}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => updateLastVisited(params.data, "careersSiteUS")}
        >
          URL
        </a>
      ) : (
        "Not Available"
      ),
  },
  {
    field: "careersSiteQuickSearch",
    headerName: "Careers Site Quick Search",
    width: 230,
    cellRenderer: (params) => {
      const companyName = params.data.name;
      const searchEngines = {
        Google: `https://www.google.com/search?q=${encodeURIComponent(
          companyName + " careers"
        )}`,
        Bing: `https://www.bing.com/search?q=${encodeURIComponent(
          companyName + " careers"
        )}`,
        DuckDuckGo: `https://duckduckgo.com/?q=${encodeURIComponent(
          companyName + " careers"
        )}`,
        Yahoo: `https://search.yahoo.com/search?p=${encodeURIComponent(
          companyName + " careers"
        )}`,
      };
      const searchUrl =
        searchEngines[preferredSearchEngine] || searchEngines.Google;

      return (
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            updateLastVisited(params.data, "careersSiteQuickSearch")
          }
        >
          {preferredSearchEngine} Search
        </a>
      );
    },
  },
  {
    field: "companyQuickSearch",
    headerName: "Company Quick Search",
    width: 215,
    cellRenderer: (params) => {
      const companyName = params.data.name;
      const searchEngines = {
        Google: `https://www.google.com/search?q=${encodeURIComponent(
          companyName
        )}`,
        Bing: `https://www.bing.com/search?q=${encodeURIComponent(
          companyName
        )}`,
        DuckDuckGo: `https://duckduckgo.com/?q=${encodeURIComponent(
          companyName
        )}`,
        Yahoo: `https://search.yahoo.com/search?p=${encodeURIComponent(
          companyName
        )}`,
      };
      const searchUrl =
        searchEngines[preferredSearchEngine] || searchEngines.Google;

      return (
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => updateLastVisited(params.data, "companyQuickSearch")}
        >
          {preferredSearchEngine} Search
        </a>
      );
    },
  },
  {
    field: "hqLocation",
    sortable: true,
    headerName: "HQ Location",
    hide: false,
    filter: true,
    tooltipField: "hqLocation",
  },
  { field: "lastUpdated", sortable: true, headerName: "Last Updated" },
  { field: "lastVisited", sortable: true, headerName: "Last Visited" },
  {
    field: "Stock Symbol",
    headerName: "Stock Symbol",
    sortable: true,
    filter: true,
    cellRenderer: (params) => {
      const stockSymbol = params.value;
      if (stockSymbol && stockSymbol !== "N/A") {
        const searchEngines = {
          Google: `https://www.google.com/search?q=${encodeURIComponent(
            stockSymbol + " stock price"
          )}`,
          Bing: `https://www.bing.com/search?q=${encodeURIComponent(
            stockSymbol + " stock price"
          )}`,
          DuckDuckGo: `https://duckduckgo.com/?q=${encodeURIComponent(
            stockSymbol + " stock price"
          )}`,
          Yahoo: `https://search.yahoo.com/search?p=${encodeURIComponent(
            stockSymbol + " stock price"
          )}`,
        };
        const searchUrl =
          searchEngines[preferredSearchEngine] || searchEngines.Google;

        return (
          <a href={searchUrl} target="_blank" rel="noopener noreferrer">
            {stockSymbol}
          </a>
        );
      } else {
        return "N/A";
      }
    },
  },
  {
    field: "Female CEO",
    headerName: "Female CEO",
    sortable: true,
    filter: true,
    cellRenderer: (params) => params.value || "No Data",
  },
  {
    field: "ATS (US)",
    headerName: "ATS (US)",
    sortable: true,
    filter: true,
    cellRenderer: (params) => params.value || "Unknown",
  },
  {
    field: "Year Founded",
    headerName: "Year Founded",
    sortable: true,
    filter: true,
    cellRenderer: (params) => params.value || "Unknown",
  },
];

export default getColumnDefs;
