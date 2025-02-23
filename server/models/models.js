const sequelize = require('../db');
const { DataTypes, Sequelize} = require('sequelize');

// Определение модели Users
const Users = sequelize.define('Users', {
    UserID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    RegistrationDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    RoleID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Roles', // Имя таблицы Roles
            key: 'RoleID'   // Имя столбца в таблице Roles
        }
    }
}, {
    tableName: 'Users', // Указываем имя таблицы в базе данных
    timestamps: false  // Если не используете поля createdAt и updatedAt
});

// Определение модели Roles
const Roles = sequelize.define('Roles', {
    RoleID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    RoleName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Roles', // Указываем имя таблицы в базе данных
    timestamps: false  // Если не используете поля createdAt и updatedAt
});

// Определение модели Courses
const Courses = sequelize.define('Courses', {
    CourseID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    CourseName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'Courses', // Указываем имя таблицы в базе данных
    timestamps: false  // Если не используете поля createdAt и updatedAt
});

// Определение модели PurchasedCourses
const PurchasedCourses = sequelize.define('PurchasedCourses', {
    PurchaseID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Имя таблицы Users
            key: 'UserID'   // Имя столбца в таблице Users
        }
    },
    CourseID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Courses', // Имя таблицы Courses
            key: 'CourseID'   // Имя столбца в таблице Courses
        }
    },
    PurchaseDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'PurchasedCourses', // Указываем имя таблицы в базе данных
    timestamps: false  // Если не используете поля createdAt и updatedAt
});

// Определение модели Cart
const Cart = sequelize.define('Cart', {
    CartID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Имя таблицы Users
            key: 'UserID'   // Имя столбца в таблице Users
        }
    },
    CourseID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Courses', // Имя таблицы Courses
            key: 'CourseID'   // Имя столбца в таблице Courses
        }
    },
    AddedDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'Cart', // Указываем имя таблицы в базе данных
    timestamps: false  // Если не используете поля createdAt и updatedAt
});

// Определение модели Discussions
const Discussions = sequelize.define('Discussions', {
    DiscussionID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    CreatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Имя таблицы Users
            key: 'UserID'   // Имя столбца в таблице Users
        }
    },
    CreatedDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'Discussions', // Указываем имя таблицы в базе данных
    timestamps: false  // Если не используете поля createdAt и updatedAt
});

// Определение модели Comments
const Comments = sequelize.define('Comments', {
    CommentID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    DiscussionID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Обязательное поле
        references: {
            model: 'Discussions',
            key: 'DiscussionID',
        },
    },
    NewsID: {
        type: DataTypes.INTEGER,
        allowNull: true, // Разрешаем null
        references: {
            model: 'News',
            key: 'NewsID',
        },
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Обязательное поле
        references: {
            model: 'Users',
            key: 'UserID',
        },
    },
    Content: {
        type: DataTypes.TEXT,
        allowNull: false, // Обязательное поле
    },
    CreatedDate: {
        type: DataTypes.DATE,
        allowNull: false, // Обязательное поле
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false, // Обязательное поле
    },
}, {
    tableName: 'Comments',
    timestamps: false,
});

// Определение модели News
const News = sequelize.define('News', {
    NewsID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    CreatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Имя таблицы Users
            key: 'UserID'   // Имя столбца в таблице Users
        }
    },
    CreatedDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'News', // Указываем имя таблицы в базе данных
    timestamps: false // Отключаем автоматическое добавление полей createdAt и updatedAt
});

// Определение модели UserReports
const UserReports = sequelize.define('UserReports', {
    ReportID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Имя таблицы Users
            key: 'UserID'   // Имя столбца в таблице Users
        }
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ReportDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'UserReports', // Указываем имя таблицы в базе данных
    timestamps: false  // Если не используете поля createdAt и updatedAt
});

// Устанавливаем связи между моделями
Users.belongsTo(Roles, {
    foreignKey: 'RoleID',
    as: 'role' // Псевдоним для связи
});



Roles.hasMany(Users, {
    foreignKey: 'RoleID',
    as: 'users' // Псевдоним для связи
});

Users.hasMany(PurchasedCourses, {
    foreignKey: 'UserID',
    as: 'purchasedCourses' // Псевдоним для связи
});

Courses.hasMany(PurchasedCourses, {
    foreignKey: 'CourseID',
    as: 'purchasedCourses' // Псевдоним для связи
});

Users.hasMany(Cart, {
    foreignKey: 'UserID',
    as: 'cartItems' // Псевдоним для связи
});

Courses.hasMany(Cart, {
    foreignKey: 'CourseID',
    as: 'cartItems' // Псевдоним для связи
});

Users.hasMany(Discussions, {
    foreignKey: 'CreatedBy',
    as: 'discussions' // Псевдоним для связи
});

Discussions.hasMany(Comments, {
    foreignKey: 'DiscussionID',
    as: 'comments' // Псевдоним для связи
});

Users.hasMany(Comments, {
    foreignKey: 'UserID',
    as: 'comments' // Псевдоним для связи
});

Users.hasMany(News, {
    foreignKey: 'CreatedBy',
    as: 'news' // Псевдоним для связи
});

Users.hasMany(UserReports, {
    foreignKey: 'UserID',
    as: 'reports' // Псевдоним для связи
});

Cart.belongsTo(Courses, {
    foreignKey: 'CourseID',
    as: 'course' // Псевдоним для связи
});

module.exports = {
    Users,
    Roles,
    Courses,
    PurchasedCourses,
    Cart,
    Discussions,
    Comments,
    News,
    UserReports
};