import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Covoits = new Mongo.Collection('covoits');

if (Meteor.isServer) {
    Meteor.publish('covoits', () => {
        return Covoits.find();
    })
}

//Secure our methods
Meteor.methods({
    'covoits.insert' (date, from, to, availablePlaces, comments, price) {
        
        //Check if user is not logged in
        if (!this.userId) {
            throw new Meteor.Error('Not-authorized');
        };

        function toDate(date) {
            const [year,
                month,
                day] = date.split("-")
            return new Date(year, month, day)
        }

        date = toDate(date);

        availablePlaces = parseInt(availablePlaces, 10);
        price = parseInt(price, 10);

        new SimpleSchema({
            date: {
                type: Date
            },
            from: {
                type: String,
                label: "The from location",
                min: 2,
                max: 50
            },
            to: {
                type: String,
                label: "The to location",
                min: 2,
                max: 50
            },
            availablePlaces: {
                type: Number,
                label: "The number of places",
                min: 0,
                max: 8
            },
            comments: {
                type: String,
                label: "The comments",
                max: 500,
                optional: true
            },
            price: {
                type: Number,
                label: "The price",
                max: 500,
            }
        }).validate({date, from, to, availablePlaces, comments, price});

        Covoits.insert({
            date,
            from,
            to,
            availablePlaces,
            comments,
            userId: this.userId,
            active: true,
            messages: [],
            price
        });
    },
     'covoits.update' (active, date, from, to, availablePlaces, comments, price, _uid, _id) {
        
        //Check if user is not logged in
        if (!this.userId) {
            throw new Meteor.Error('Not-authorized');
        };
        if (this.userId !== _uid) {
            throw new Meteor.Error('Not-authorized');
        };

        function toDate(date) {
            const [year,
                month,
                day] = date.split("-")
            return new Date(year, month, day)
        }

        if (active == "false")
        {
            active = false;
        }

        date = toDate(date);

        availablePlaces = parseInt(availablePlaces, 10);

        price = parseInt(price, 10);

        new SimpleSchema({
            date: {
                type: Date
            },
            from: {
                type: String,
                label: "The from location",
                min: 2,
                max: 50
            },
            to: {
                type: String,
                label: "The to location",
                min: 2,
                max: 50
            },
            availablePlaces: {
                type: Number,
                label: "The number of places",
                min: 0,
                max: 8
            },
            comments: {
                type: String,
                label: "The comments",
                max: 500,
                optional: true
            },
            price: {
                type: Number,
                label: "The price",
                max: 500,
            }
        }).validate({date, from, to, availablePlaces, comments, price});

        Covoits.update(_id,{
            userId: this.userId,
            date,
            from,
            to,
            availablePlaces,
            comments,
            price,
            active,
        });
    },
    'covoits.setActive' (_id, active) {
        if(!this.userId){
            throw new Meteor.Error('Not right user');
        }
        
    },
    'covoits.insertMessage' (id, message) {
        if(!this.userId){
            throw new Meteor.Error('Not right user');
        }
        if (!message) {
            throw new Meteor.Error('Message empty');
        }
        const email = Meteor.users.findOne({_id: this.userId}).emails[0].address;
        Covoits.update({_id : id},{"$push":{'messages' : [email, message]}});
    }
});