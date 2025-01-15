import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { PostmarkService } from './postmark.service';

describe('AppController', () => {
  let appController: AppController;
  let postmarkService: PostmarkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: PostmarkService,
          useValue: {
            sendEmail: jest.fn(), // Mock the sendEmail method
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    postmarkService = module.get<PostmarkService>(PostmarkService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should call PostmarkService.sendEmail with the correct parameters', async () => {
      const emailData = {
        to: 'recipient@example.com',
        subject: 'Test Email',
        textBody: 'This is a test email.',
      };

      // Mock implementation of sendEmail
      jest.spyOn(postmarkService, 'sendEmail').mockResolvedValue(undefined);

      // Call the sendEmail method on the controller
      await appController.sendEmail(emailData);

      // Assert that PostmarkService.sendEmail was called with the correct arguments
      expect(postmarkService.sendEmail).toHaveBeenCalledWith(
        emailData.to,
        emailData.subject,
        emailData.textBody,
      );
    });

    it('should handle errors from PostmarkService.sendEmail gracefully', async () => {
      const emailData = {
        to: 'recipient@example.com',
        subject: 'Test Email',
        textBody: 'This is a test email.',
      };

      // Mock implementation of sendEmail to throw an error
      jest.spyOn(postmarkService, 'sendEmail').mockRejectedValue(new Error('Postmark error'));

      try {
        await appController.sendEmail(emailData);
      } catch (error) {
        expect(error.message).toBe('Postmark error');
      }
    });
  });
});