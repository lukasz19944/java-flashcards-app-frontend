import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllTickets, deleteTicket } from "../../actions/ticketActions";

class AllTickets extends Component {
  componentDidMount() {
    this.props.getAllTickets();
  }
  render() {
    let { tickets } = this.props.ticket;
    return (
      <div className="tickets">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Wszystkie zgłoszenia</h1>
              <br />
              <table className="table">
                <thead>
                  <tr>
                    <th className="w-50">Id</th>
                    <th>Wiadomość</th>
                    <th>Podgląd</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map(ticket => (
                    <tr key={ticket.id}>
                      <td className="text-left align-middle">{ticket.id}</td>
                      <td className="align-middle">{ticket.message}</td>
                      <td className="align-middle">
                        <Link to={`/showTicket/${ticket.id}`}>
                          <svg
                            id="i-eye"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentcolor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          >
                            <circle cx="17" cy="15" r="1" />
                            <circle cx="16" cy="16" r="6" />
                            <path d="M2 16 C2 16 7 6 16 6 25 6 30 16 30 16 30 16 25 26 16 26 7 26 2 16 2 16 Z" />
                          </svg>
                        </Link>
                      </td>
                      <td className="align-middle"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ticket: state.ticket
});

export default connect(
  mapStateToProps,
  { getAllTickets, deleteTicket }
)(AllTickets);
