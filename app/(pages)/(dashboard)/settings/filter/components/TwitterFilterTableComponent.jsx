import MUIDataTable from "mui-datatables";

const columns = ["No", "Category", "Platform", "Parameter", "Action"];

const data = [
  ["1", "Keyword", "Twitter", "Polda", ""],
  ["2", "Keyword", "Twitter", "Polda Jatim", ""],
  ["3", "Mention", "Twitter", "@poldajatim", ""],
  ["4", "Topic", "Twitter", "Begal", ""],
];

const options = {
  filterType: "checkbox",
  selectableRowsHideCheckboxes: true,
};

const TwitterFilterTableComponent = () => {
  return (
    <MUIDataTable
      //   title={"Employee List"}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default TwitterFilterTableComponent;
