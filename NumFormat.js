function DrawNumber(value){
    if(value<1){
        return value.toFixed(2);
    }
    if(value < 1000){
        return value.toFixed(0);
    }
    if(value < 1000000){
        return (value / 1000).toFixed(1) + 'K';
    }

    if(value < 1000000000){
        return (value / 1000000).toFixed(1) + 'M';
    }

    return (value / 1000000000).toFixed(1) + 'B'
}