import styled from "@emotion/styled";


export default function PlaylistFrame({title, id}: { title: string, id: number }) {

    const Container = styled.a`
      display: block;
      width: 200px;
      height: 200px;
      border-radius: 5px;
      background-color: #333;
      text-align: center;
      padding: 20px;
    `;

    const Cover = styled.img`
      width: 80%;
      height: 70%;
      border-radius: 5px;
      margin-bottom: 10px;
    `;


    const Title = styled.h2`
      padding: 10px;
      background-color: hotpink;
      font-size: 24px;
      border-radius: 4px;
      color: black;
      font-weight: bold;

      &:hover {
        color: white;
      }
    `;

    return (
        <Container href={`/playlists/${id}`}>
            <Cover/>
            <Title>{title}</Title>
        </Container>
    );
}
