exports.createPages = async function({actions, graphql}) {
  const {data} = await graphql(`
  query {
    allProjects: allMdx {
      edges {
        node {
          slug
          id
        }
      }
    }
  }
  `)

  // Create Projects page
  actions.createPage({
      path: `/projects/`,
      component: require.resolve("./src/templates/projects.js")
  })

  // Create single project page
  data.allProjects.edges.forEach(edge => {
      const slug = edge.node.slug;
      const id = edge.node.id;

      actions.createPage({
          path: `/projects/${slug}`,
          component: require.resolve("./src/templates/singleProject.js"),
          context: {id}
      })
  })
}
