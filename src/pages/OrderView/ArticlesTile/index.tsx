import { Box, Paper, Typography } from "@mui/material";
import { OrderDataContext } from "@root/context/OrderDataProvider";
import { useContext } from "react";
import ArticleItem from "./ArticleItem";

export default function ArticlesTile() {
  const { data } = useContext(OrderDataContext);
  if (!data) {
    return null;
  }
  return (
    <Paper elevation={3} sx={{ padding: (theme) => theme.spacing(3, 2), width: 350, height: 500 }}>
      <Typography variant='h5' mb={3}>Articles</Typography>
      <Box display='flex' flexDirection='column' gap={2} role='list'>
        {data?.delivery_info?.articles?.map((article) => (
          <ArticleItem article={article} key={article.articleNo} />
        ))}
      </Box>
    </Paper>
  )
}
