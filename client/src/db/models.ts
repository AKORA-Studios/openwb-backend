import { prop, pre, post, getModelForClass } from '@typegoose/typegoose';

@pre<KittenClass>('save', function () {
    this.isKitten = this.age < 1;
})
@post<KittenClass>('save', function (kitten) {
    console.log(
        kitten.isKitten ? 'We have a kitten here.' : 'We have a big kitty here.'
    );
})
class KittenClass {
    @prop()
    public name?: string;

    @prop()
    public species?: string;

    @prop()
    public age?: number;

    @prop({ default: false })
    public isKitten?: boolean;
}

const KittenModel = getModelForClass(KittenClass);

const doc = new KittenModel({
    name: 'SomeCat',
    species: 'SomeSpecies',
    age: 0,
});
await doc.save(); // this should output "We have a kitten here."
const doc = new KittenModel({
    name: 'SomeCat',
    species: 'SomeSpecies',
    age: 2,
});
await doc.save(); // this should output "We have a big kitty here."
