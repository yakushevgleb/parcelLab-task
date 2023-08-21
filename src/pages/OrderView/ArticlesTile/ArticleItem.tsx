import { ImageNotSupportedOutlined } from "@mui/icons-material";
import { Box, Typography, colors } from "@mui/material";
import { Article } from "@root/api/useOrder/types";

interface Props {
  article: Partial<Article>;
}
export default function ArticleItem(props: Props) {
  const { article } = props;
  return (
    <Box display='flex' gap={2} role='listitem'>
      {article.articleImageUrl ? (
        <Box component='img' alt={`${article.articleName} image`} src={article.articleImageUrl} width={80} sx={{ objectFit: 'cover', boxShadow: (theme) => theme.shadows[3] }} />
      ) : (
         <Box width={80} display='flex' alignItems='center' justifyContent='center' sx={{ backgroundColor: colors.blueGrey[50] }}><ImageNotSupportedOutlined /></Box>
      )}
      <Box>
        <Typography variant='subtitle2'>{article.articleName} (x{article.quantity})</Typography>
        <Typography variant='body2'>Article number: {article.articleNo}</Typography>
        <Typography variant='caption' color={colors.blueGrey[500]}><strong>{article.price}&euro;</strong></Typography>
      </Box>
    </Box>
  )
}
