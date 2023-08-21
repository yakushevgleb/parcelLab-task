import { useContext } from "react";
import ArticlesTile from "./ArticlesTile";
import StatusTile from "./StatusTile";
import UpdatesTile from "./UpdatesTile";
import { OrderDataContext } from "@root/context/OrderDataProvider";
import { CircularProgress } from "@mui/material";

export default function OrderView() {
  const { isLoading } = useContext(OrderDataContext);

  if (isLoading) {
    return <CircularProgress size={50} />
  }

  return (
    <>
      <StatusTile />
      <UpdatesTile />
      <ArticlesTile />
    </>
  )
}
