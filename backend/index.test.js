const User = require('../backend/models/userModel');
const Task = require('../backend/models/taskModel');
const bcrypt = require('bcrypt');
const validator = require('validator');

jest.mock('bcrypt');
jest.mock('validator');

describe('User Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {

    it('should throw an error if any field is missing', async () => {
      await expect(User.signup('', 'Doe', 'john@example.com', 'password')).rejects.toThrow('All fields must be filled');
    });
  });

  describe('login', () => {
    it('should return user if email and password match', async () => {
      // Mock User.findOne
      User.findOne = jest.fn().mockResolvedValueOnce({ _id: 'userId', firstName: 'Alli', lastName: 'Fintz', email: 'allif@gmail.com', password: 'mockedHash' });

      // Mock bcrypt.compare
      bcrypt.compare.mockResolvedValueOnce(true);

      const user = await User.login('allif@gmail.com', 'mockedHash');

      expect(user._id).toBe('userId');
      expect(user.firstName).toBe('Alli');
      expect(user.lastName).toBe('Fintz');
      expect(user.email).toBe('allif@gmail.com');
      expect(user.password).toBe('mockedHash');
    });

    it('should throw an error if email does not exist', async () => {
      // Mock User.findOne
      User.findOne = jest.fn().mockResolvedValueOnce(null);

      await expect(User.login('nonexistent@example.com', 'password')).rejects.toThrow('Incorrect email');
    });

  });
});

describe('Task Model', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('Task Creation', () => {
  
      it('should throw an error if any required field is missing', async () => {
        const invalidTaskData = {
          description: 'This is a sample task description.',
          date: new Date(),
          isCompleted: false,
          user_id: 'userId',
        };
  
        await expect(Task.create(invalidTaskData)).rejects.toThrow();
      });
    });
  
    describe('Task Validation', () => {
      it('should fail validation if title is missing', async () => {
        const taskWithoutTitle = new Task({
          description: 'This is a sample task description.',
          date: new Date(),
          isCompleted: false,
          user_id: 'userId',
        });
  
        await expect(taskWithoutTitle.validate()).rejects.toThrow();
      });
  
      it('should fail validation if date is missing', async () => {
        const taskWithoutDate = new Task({
          title: 'Sample Task',
          description: 'This is a sample task description.',
          isCompleted: false,
          user_id: 'userId',
        });
  
        await expect(taskWithoutDate.validate()).rejects.toThrow();
      });
  
      // Add more validation tests for other scenarios such as missing user_id, invalid date format, etc.
    });
  });
