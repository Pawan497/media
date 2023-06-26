import {  useEffect } from "react";
import { useSelector } from "react-redux";
import { addUser, fetchUsers } from "../store"; // thunk
import Skeleton from "./Skeleton";
import UsersListItem from "./UsersListItem";
import Button from "./Button";
import { useThunk } from "../hooks/use-thunk";

function UsersList() {

    // const [isLoadingUsers, setIsLoadingUsers ] = useState(false);
    // const [loadingUsersError, setLoadingUsersError ] = useState(null);

    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);

    // const [isCreatingUser, setIsCreatingUser] = useState(false);
    // const [creatingUserError, setCreatingUserError] = useState(null);

    const [doCreateUser ,isCreatingUser, creatingUserError] = useThunk(addUser);

    // const dispatch = useDispatch();

    const { data } = useSelector((state) => {
        return state.users;
    });

    // console.log(isLoading,data,error)

    useEffect(() => {
        // setIsLoadingUsers(true);
        // dispatch(fetchUsers())
        //     .unwrap() // it is necessary otherwise promise will not work as expected because then will be called whether promise is succeed or failed
        //     // .then(() => {
        //     //     // console.log("success");
        //     // })
        //     .catch((err) =>
        //         // console.log("failure");
        //         setLoadingUsersError(err))
        //     .finally(() => setIsLoadingUsers(false));

        // OR
        doFetchUsers();

    },[doFetchUsers]);// not hard rule just to avoid eslint warning otherwise [] is fine

    const handleUserAdd = () => {

        // setIsCreatingUser(true);
        // dispatch(addUser())
        //     .unwrap()
        //     .catch(err => setCreatingUserError(err))
        //     .finally(() => setIsCreatingUser(false));

        // OR

        doCreateUser();

    };

    let content;

    if(isLoadingUsers) {
        content = <Skeleton times={6} className="h-10 w-full" />;
    }else if(loadingUsersError) {
        content = (<div>Error fetching data...</div>);
    } else {
        content = 
            data.map((user) => <UsersListItem key={user.id} user={user} />);
    }


    return (<div>
                <div className="flex flex-row justify-between items-center m-3">
                    <h1 className="m-2 text-xl">Users</h1>
                    <Button loading={isCreatingUser} onClick={handleUserAdd}>+ Add User</Button>
                    {creatingUserError && "Error creating user..."} 
                </div>
                {content}
            </div>);
}

export default UsersList;