import * as React from 'react';
import {useState} from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useSelector } from 'react-redux';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Image } from 'react-bootstrap';

function DetailPage() {

  const singleProduct = useSelector(state => state.product.singleProduct)
  const [imgNum, setImgNum] = useState(0)

  
  const handleNext = () =>  {
    if(singleProduct.images.length > 1 && imgNum !== singleProduct.images.length){
      setImgNum(imgNum+1)
    }
  }
  const handlePrev = () =>  {
    if(imgNum >= 1 ){
      setImgNum(imgNum-1)
    }
  }
    return ( 
        <div>
           <Card sx={{ display: 'flex', mt:12 }}>
             <div style={{width:"300px", minHeight:"300px", }}>
            <Image style={{ width:"100%"}} src={singleProduct?.images[imgNum]}
            alt="Live from space album cover"
            />
        </div>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {singleProduct?.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          {singleProduct?.summary}
          </Typography>
          <Typography variant="subtitle1" component="div">
          {singleProduct?.description}
          </Typography>
        </CardContent>
      </Box>
      
    </Card>
    <div style={{display:"flex",margin:"5px auto"}}>
    <IconButton aria-label="delete" size="small" sx={{display: imgNum>0 ? "block":"none", backgroundColor:'palegoldenrod'}}>
          <ArrowBack fontSize="inherit" onClick={() => handlePrev()}/>
      </IconButton>
        <IconButton aria-label="delete" size="small" sx={{display: singleProduct.images.length>0 && imgNum !== singleProduct.images.length? "block":"none", backgroundColor:'palegoldenrod'}}>
          <ArrowForward fontSize="inherit" onClick={() => handleNext()}/>
      </IconButton>
    </div>
        </div>
     );
}

export default DetailPage;