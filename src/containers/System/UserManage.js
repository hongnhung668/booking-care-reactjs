import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';


class UserManage extends Component {

    constructor(props){
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false
        }
    }
    /**
     * Life cycle
     * Run component:
     * 1. Run constructor -> init state
     * 2. DidMount (set state)
     * 3. Render
     */
    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            })
        }
        console.log(response)
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModal = () =>{
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            console.log(response)
            if(response && response.errCode !== 0){
                alert(response.message);
            }else{
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA', {'id':'your id'})
            }
        } catch (error) {
            console.log(error)
        }
       
    }

    handleDeleteUser = async (user) => {
        console.log(user)
        try {
            let response =  await deleteUserService(user.id);
            if(response && response.errCode !== 0){
                alert(response.message);
            }else{
                await this.getAllUsersFromReact();
                alert(response.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="text-center">
                <ModalUser 
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent = {this.toggleUserModal}
                    createNewUser = {this.createNewUser}
                />
                <div className='title text-center'>Manage users</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={()=>this.handleAddNewUser()}
                    >
                        <i className='fas fa-plus'></i>Add new user</button>
                </div>
                <div className='user-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Adress</th>
                            <th>Action</th>
                        </tr>
                        
                        { arrUsers && arrUsers.map((item, index) => {
                            return (
                                <>
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'><i className='fas fa-pencil-alt'></i></button>
                                            <button 
                                                className='btn-delete' 
                                                onClick={()=>this.handleDeleteUser(item)}
                                            ><i className='fas fa-trash'></i></button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                        
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
