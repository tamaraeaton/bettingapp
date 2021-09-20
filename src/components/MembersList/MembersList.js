import React, { useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./MembersList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const MembersList = () => {
  const { membersArr, getBetMembers, disBet } = useContext(AppContext);

  useEffect(() => {
    getBetMembers(disBet.id);
  }, []);

  console.log(membersArr);

  return (
    <div className="general flex-component">
      <div className="custom-member-list">
        <h2 className="member-list-title">Members List</h2>
        <div>
          <table>
            <thead>
              <tr className="memberslist-head-row">
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {membersArr.map((member, index) => (
                <tr key={index} className="memberslist-head-row member-item">
                  <td className="custom-border">
                    {member.firstName + " " + member.lastName}
                  </td>
                  <td className="custom-border">{member.email}</td>
                  <td>
                    <a href={`mailto:${member.email}`}>
                      <button className="custom-button custom-icon">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </button>
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
