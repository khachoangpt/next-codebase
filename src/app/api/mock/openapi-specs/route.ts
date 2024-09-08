export async function GET() {
  return new Response(
    JSON.stringify({
      openapi: '3.0.0',
      paths: {
        '/api/v1/auth/login': {
          post: {
            operationId: 'login',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/LoginDto',
                  },
                },
              },
            },
            responses: {
              '200': {
                description: '',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/LoginResponse',
                    },
                  },
                },
              },
            },
            tags: ['auth'],
          },
        },
      },
      info: {
        title: 'Mock OpenAPI',
        description: '',
        version: '1.0.0',
        contact: {},
      },
      tags: [],
      servers: [],
      components: {
        securitySchemes: {
          bearer: {
            scheme: 'bearer',
            bearerFormat: 'JWT',
            type: 'http',
          },
        },
        schemas: {
          LoginDto: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
              },
              password: {
                type: 'string',
              },
            },
            required: ['email', 'password'],
          },
          Gender: {
            type: 'string',
            enum: ['MALE', 'FEMALE', 'OTHER'],
          },
          UserInfo: {
            type: 'object',
            properties: {
              gender: {
                nullable: true,
                $ref: '#/components/schemas/Gender',
              },
              id: {
                type: 'string',
              },
              email: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              firstName: {
                type: 'string',
                nullable: true,
              },
              lastName: {
                type: 'string',
                nullable: true,
              },
              verifiedEmail: {
                type: 'boolean',
              },
              memberType: {
                type: 'string',
              },
              birthday: {
                format: 'date-time',
                type: 'string',
                nullable: true,
              },
              avatar: {
                type: 'string',
                nullable: true,
              },
              bio: {
                type: 'string',
                nullable: true,
              },
              phoneNumber: {
                type: 'string',
                nullable: true,
              },
              country: {
                type: 'string',
                nullable: true,
              },
              city: {
                type: 'string',
                nullable: true,
              },
              district: {
                type: 'string',
                nullable: true,
              },
              address: {
                type: 'string',
                nullable: true,
              },
              postalCode: {
                type: 'string',
                nullable: true,
              },
              status: {
                type: 'string',
              },
              metadata: {
                type: 'object',
                nullable: true,
              },
            },
            required: [
              'gender',
              'id',
              'email',
              'name',
              'firstName',
              'lastName',
              'verifiedEmail',
              'memberType',
              'birthday',
              'avatar',
              'bio',
              'phoneNumber',
              'country',
              'city',
              'district',
              'address',
              'postalCode',
              'status',
              'metadata',
            ],
          },
          LoginResponse: {
            type: 'object',
            properties: {
              accessToken: {
                type: 'string',
              },
              refreshToken: {
                type: 'string',
              },
              user: {
                $ref: '#/components/schemas/UserInfo',
              },
            },
            required: ['accessToken', 'refreshToken', 'user'],
          },
        },
      },
    }),
  )
}
