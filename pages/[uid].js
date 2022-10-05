function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export default UserIdPage;

// getServerSideProps: doesn't require getStaticPaths in order to
// render pages. this is because ALL pages are generated on the
// fly so there aren't any pages/paths to pre-generate
export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.uid;
  return {
    props: {
      id: 'userid-' + userId,
    },
  };
}
