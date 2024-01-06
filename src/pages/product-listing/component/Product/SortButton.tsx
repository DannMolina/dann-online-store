import { SwapOutlined } from "@ant-design/icons";
import { Space } from "antd";

interface ISortButton {
  handleSort: (sortType: 'lowToHigh' | 'highToLow') => void;
  sortOrder: 'lowToHigh' | 'highToLow' | '';
  setSortOrder: React.Dispatch<React.SetStateAction<'lowToHigh' | 'highToLow' | ''>>;
}

export const SortButton = ({ handleSort, sortOrder, setSortOrder }: ISortButton) => {
  return (
    <Space>
      {
        sortOrder === 'lowToHigh' && <span onClick={() => {
          handleSort('lowToHigh');
          setSortOrder('highToLow');
        }}>Sorted price: low to high</span>
      }
      {
        sortOrder === 'highToLow' && <span onClick={() => {
          handleSort('highToLow');
          setSortOrder('lowToHigh');
        }}>Sorted price: high to low</span>
      }
      <SwapOutlined />
    </Space>
  );
};
