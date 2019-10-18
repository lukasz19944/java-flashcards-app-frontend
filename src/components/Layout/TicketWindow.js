import React, { Component } from "react";
import { Button, Modal } from "reactstrap";
import { createTicket } from "../../actions/ticketActions";
import { connect } from "react-redux";
import classnames from "classnames";

class TicketWindow extends Component {
  constructor() {
    super();

    this.state = {
      message: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newTicket = {
      flashcard: this.props.flashcard,
      message: this.state.message
    };

    this.props.createTicket(newTicket);

    // do poprawy
    if (this.state.message !== "") {
      this.props.close();
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Modal isOpen={true} size="lg">
          <form onSubmit={this.onSubmit} className="m-3">
            <h3 className="display-4 text-center">Zgłoszenie błędu</h3>
            <hr />
            <h5 className="form-group display-5">
              Zgłoś błąd dotyczący pytania o identyfikatorze:{" "}
              {this.props.flashcard.id}
            </h5>
            <div className="form-group">
              <textarea
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.message
                })}
                placeholder="Informacje o błędzie"
                name="message"
                value={this.state.message}
                style={{ height: "200px" }}
                onChange={this.onChange}
              />
              {errors.message && (
                <div className="invalid-feedback">{errors.message}</div>
              )}
            </div>
            <input type="submit" className="btn btn-primary btn-block mt-4" />
            <Button color="danger" onClick={this.props.close} className="w-100">
              Zamknij
            </Button>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.error
});

export default connect(
  mapStateToProps,
  { createTicket }
)(TicketWindow);
