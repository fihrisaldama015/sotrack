import MUIDataTable from "mui-datatables";

const columns = ["No", "Category", "Platform", "Parameter", "Action"];

const data = [
  ["1", "Keyword", "Twitter", "Yonkers", ""],
  ["2", "Keyword", "Twitter", "Hartford", ""],
  ["3", "Mention", "Twitter", "Tampa", ""],
  ["4", "Topic", "Twitter", "Dallas", ""],
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
