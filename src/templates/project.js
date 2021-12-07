import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/Layout/Layout"
import * as projectStyles from "./project.module.scss"
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
} from "@mui/material"

const ProjectTemplate = ({ data }) => {
  const { slug, title, mainImage, body, techStack, websiteLink, githubLink } =
    data.project
  console.log(websiteLink)
  return (
    <Layout>
      <Paper square className={projectStyles.paper}>
        <Container>
          <Grid
            container
            display="flex"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className={projectStyles.header}
          >
            <Grid item>
              <Typography variant="h2">{title}</Typography>
            </Grid>

            <Grid item>
              <Link to="/">
                <Button variant="contained" color="primary">
                  Back
                </Button>
              </Link>
            </Grid>
          </Grid>
          <Card square className={projectStyles.lightCard}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="500"
                image={mainImage.asset.url}
                alt={title}
              />
              <CardContent>
                <Typography>
                  {body.map(content => (
                    <p key={slug.current}>{content.children[0].text}</p>
                  ))}
                </Typography>
              </CardContent>
              <CardActions>
                <Grid
                  container
                  display="flex"
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  spacing={8}
                >
                  <Grid item>
                    <a
                      href={websiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="contained" color="primary">
                        Website
                      </Button>
                    </a>
                  </Grid>
                  <Grid item>
                    <a
                      href={githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="contained" color="primary">
                        Github
                      </Button>
                    </a>
                  </Grid>
                </Grid>
              </CardActions>
            </CardActionArea>
          </Card>
        </Container>
      </Paper>
    </Layout>
  )
}

export default ProjectTemplate

export const data = graphql`
  query ProjectQuery($slug: String) {
    project: sanityProjects(slug: { current: { eq: $slug } }) {
      slug {
        current
      }
      title
      mainImage {
        asset {
          url
        }
      }
      body {
        children {
          text
        }
      }
      techStack {
        title
        image {
          asset {
            url
          }
        }
        slug {
          current
        }
      }
      websiteLink
      githubLink
    }
  }
`