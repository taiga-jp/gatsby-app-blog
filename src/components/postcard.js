import { Link } from "gatsby"
import React from "react"
import {
  makeStyles
} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import "../css/postcard.css"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    width: 345,
    height: 140,
  },
});

function PostCard(props) {
  const {
    propsSlug,
    propsThumb,
    propsTitle,
    propsCreated,
    propsBody,
    propsTags,
  } = props
  const textSlice = target => {
    var text = target
    var slicetext = text.length > 20 ? text.slice(0, 40) + "…" : text
    return slicetext
  }
  const classes = useStyles();
  return (
    <Link className = "postcard"
      to = {
        `/bloglist/${propsSlug}`
      }
      key = {
        propsSlug
      } >
    <Card Card className = {
      classes.root + ' ' + 'postcard-contents'
    } >
        <CardActionArea className="postcard-contents__btn" >
          <CardMedia
            className={classes.media}
            image = {propsThumb}
            title="Contemplative Reptile"
          />
          <CardContent className="postcard-contents__main">
            <Typography gutterBottom variant="h5" component="h2">
              {propsTitle}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {textSlice(propsBody)}
            </Typography>
            <Typography className="postcard-tag" Typography variant="body2" color="textSecondary" component="p">
              {propsTags.map(tag => (
                <span key={tag}>
                  {tag}
                </span>
              ))}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}

export default PostCard
