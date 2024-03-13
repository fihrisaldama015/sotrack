import MUIDataTable from "mui-datatables";

const columns = ["No", "Category", "Platform", "Parameter", "Action"];

const data = [
  ["1", "Keyword", "Instagram", "Polda", ""],
  ["2", "Keyword", "Instagram", "Polda Jatim", ""],
  ["3", "Mention", "Instagram", "@poldajatim", ""],
  ["4", "Topic", "Instagram", "Begal", ""],
];

const options = {
  filterType: "checkbox",
  selectableRowsHideCheckboxes: true,
};

const InstagramFilterTableComponent = () => {
  return (
    <MUIDataTable
      //   title={"Employee List"}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default InstagramFilterTableComponent;
