import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import AlbumsListItem from "./AlbumsListItem";
import Button from "./Button";
import Skeleton from "./Skeleton";

function AlbumsList({ user }) {

    const [addAlbum, results] = useAddAlbumMutation();
    // console.log(results); 

    const { data, error, isFetching } = useFetchAlbumsQuery(user);
    // useFetchAlbumsQuery(user);
    // console.log(data, error, isLoading);

    // const result = useFetchAlbumsQuery(user);
    // console.log(result);

    const handleAddAlbum = () => {
        addAlbum(user);
    };

    let content;
    if(isFetching){
        content = <Skeleton times={3} className="h-10 w-full" />
    } else if(error) {
        content = <div>Error loading albums!</div>
    } else {
        content = data.map(album => {
            return <AlbumsListItem key={album.id} album={album} />
        });
    }

    return (<div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Albums For {user.name}</h3>
                <Button onClick={handleAddAlbum} loading={results.isLoading} >+ Add Album</Button>
            </div>
            <div>
                {content}
            </div>
        </div>);
}

export default AlbumsList;