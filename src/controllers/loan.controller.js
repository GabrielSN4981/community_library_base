import loanService from "../services/loan.service.js";

async function createLoanController(req, res) {
  const { bookId, dueDate } = req.body;
  const userId = req.userId;

  try {
    const createdLoan = await loanService.createLoanService(
      userId,
      bookId,
      dueDate
    );
    res.status(201).send(createdLoan);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function findAllLoanController(req, res) {
  try {
    const loans = await loanService.findAllLoanService();
    res.send(loans);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

async function findLoanByIdController(req, res) {
  const loanId = req.params.id;

  try {
    const loans = await loanService.findLoanByIdService(loanId);
    res.send(loans);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function deleteLoanController(req, res) {
  const loanId = req.params.id;
  const userId = req.userId;

  try {
    const response = await loanService.deleteLoanService(loanId, userId);
    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export default {
  createLoanController,
  findAllLoanController,
  findLoanByIdController,
  deleteLoanController,
};
