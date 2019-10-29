<?php 
    get_header();
?>
    <div class="row cards">
        <div class="col-12">
            <h2>Magical Creatures</h2>
            <p>The following Foundables can be found in the Care of Magical Creatures category of the Registry in Harry Potter: Wizards Unite.</p>
        </div>
        <?php 
        if ( have_posts() ) : 
            while ( have_posts() ) : the_post(); 
                ?>
                <div class="col-12 col-md-4">
                    <div class="card">
                        <div class="card_image_container">
                            <?php
                            $image = get_field('image');
                            if( !empty( $image ) ): ?>
                                <img src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
                            <?php endif; ?>
                            ?>
                        </div>
                        <div class="card_txt_container">
                            <h2><a href=""><?php the_title() ?></a></h2>
                            <?php the_content() ?>
                        </div>
                    </div>
                </div>
                <?php
            endwhile; 
        endif; 
        ?>
    </div>
<?php
    get_footer();
?>