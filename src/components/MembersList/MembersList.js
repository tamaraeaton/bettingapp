import React, { useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./MembersList.css";

const MembersList = () => {
  const { getMembers, members } = useContext(AppContext);

  useEffect(() => {
    getMembers();
  }, []);
  console.log(members);

  return (
    <div className='general flex-component'>
      <div className='custom-member-list'>
        <h2 className='member-list-title'>Members List</h2>
        <div>
          <table>
            <thead>
              <tr className='memberslist-head-row'>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr key={index} className='memberslist-head-row member-item'>
                  <td className="custom-border">{member.firstName}</td>
                  <td className="custom-border">{member.lastName}</td>
                  <td className="custom-border">{member.email}</td>
                  <td>
                    <a href={`mailto:${member.email}`}>
                      <button>Contact</button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MembersList;
