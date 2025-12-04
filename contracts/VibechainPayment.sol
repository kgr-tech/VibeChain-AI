// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title VibechainPayment
 * @dev Smart contract for processing payments and generating on-chain receipts
 */
contract VibechainPayment {
    address public owner;
    uint256 public totalPayments;
    
    struct Payment {
        address from;
        address to;
        uint256 amount;
        uint256 timestamp;
        string metadata;
        bool completed;
    }
    
    mapping(uint256 => Payment) public payments;
    mapping(address => uint256[]) public userPayments;
    
    event PaymentCreated(
        uint256 indexed paymentId,
        address indexed from,
        address indexed to,
        uint256 amount,
        uint256 timestamp,
        string metadata
    );
    
    event PaymentCompleted(
        uint256 indexed paymentId,
        address indexed from,
        uint256 amount
    );
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        totalPayments = 0;
    }
    
    /**
     * @dev Create a payment record and emit event
     * @param _to Recipient address
     * @param _metadata Additional payment metadata (JSON string)
     */
    function createPayment(address _to, string memory _metadata) public payable returns (uint256) {
        require(msg.value > 0, "Payment amount must be greater than 0");
        require(_to != address(0), "Invalid recipient address");
        
        uint256 paymentId = totalPayments;
        
        payments[paymentId] = Payment({
            from: msg.sender,
            to: _to,
            amount: msg.value,
            timestamp: block.timestamp,
            metadata: _metadata,
            completed: false
        });
        
        userPayments[msg.sender].push(paymentId);
        userPayments[_to].push(paymentId);
        
        totalPayments++;
        
        emit PaymentCreated(
            paymentId,
            msg.sender,
            _to,
            msg.value,
            block.timestamp,
            _metadata
        );
        
        // Transfer funds to recipient
        (bool success, ) = _to.call{value: msg.value}("");
        require(success, "Payment transfer failed");
        
        payments[paymentId].completed = true;
        
        emit PaymentCompleted(paymentId, msg.sender, msg.value);
        
        return paymentId;
    }
    
    /**
     * @dev Get payment details by ID
     */
    function getPayment(uint256 _paymentId) public view returns (
        address from,
        address to,
        uint256 amount,
        uint256 timestamp,
        string memory metadata,
        bool completed
    ) {
        Payment memory payment = payments[_paymentId];
        return (
            payment.from,
            payment.to,
            payment.amount,
            payment.timestamp,
            payment.metadata,
            payment.completed
        );
    }
    
    /**
     * @dev Get all payment IDs for a user
     */
    function getUserPayments(address _user) public view returns (uint256[] memory) {
        return userPayments[_user];
    }
    
    /**
     * @dev Get total number of payments
     */
    function getTotalPayments() public view returns (uint256) {
        return totalPayments;
    }
    
    /**
     * @dev Withdraw contract balance (owner only)
     */
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        
        (bool success, ) = owner.call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    /**
     * @dev Receive function to accept ETH
     */
    receive() external payable {}
}
