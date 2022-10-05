// this can't be pre-rendered because it depends on user data.
// instead it needs to access data, eg. from a cookie
function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export default UserProfilePage;

// getServerSideProps: expects same format as getStaticProps.
// instead of getting generated in advance, it loads props in realtime.
// it -only- runs on the server, -after- deployment
export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      username: 'Bob',
    },
  };
}
